import re
import random

RE_NONTERMINAL = re.compile(r'(<[^<> ]*>)')

def nonterminals(expansion):
    if isinstance(expansion, tuple):
        expansion = expansion[0]
    return RE_NONTERMINAL.findall(expansion)

def is_nonterminal(s):
    return RE_NONTERMINAL.match(s)

class ExpansionError(Exception):
    pass

class Grammar:
    def __init__(self):
        self.rules = {}

    def add_rule(self, non_terminal, expansions):
        if non_terminal not in self.rules:
            self.rules[non_terminal] = []
        self.rules[non_terminal].extend(expansions)

    def generate(self, start_symbol, max_nonterminals=5, max_expansion_trials=50, log=False):
        term = start_symbol
        expansion_trials = 0

        while len(nonterminals(term)) > 0:
            symbol_to_expand = random.choice(nonterminals(term))
            expansions = self.rules[symbol_to_expand]
            expansion = random.choice(expansions)
            if isinstance(expansion, tuple):
                expansion = expansion[0]

            new_term = term.replace(symbol_to_expand, expansion, 1)

            if len(nonterminals(new_term)) < max_nonterminals:
                term = new_term
                if log:
                    print("%-40s" % (symbol_to_expand + " -> " + expansion), term)
                expansion_trials = 0
            else:
                expansion_trials += 1
                if expansion_trials >= max_expansion_trials:
                    raise ExpansionError("Cannot expand " + repr(term))

        return term

# Instantiate the Grammar object
grammar = Grammar()

# Add rules for the grammar
grammar.add_rule("<name>", ["<first_name> <last_name>"])
grammar.add_rule("<first_name>", ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona"])
grammar.add_rule("<last_name>", ["Smith", "Johnson", "Brown", "Garcia", "Martinez", "Lee"])
grammar.add_rule("<job_title>", ["Software Engineer", "Data Scientist", "Product Manager", "UX Designer", "DevOps Engineer"])
grammar.add_rule("<role>", ["Intern", "Junior", "Senior"])
grammar.add_rule("<entry>", ["<name>, <job_title>, <role>"])

# # Generate a random entry
# for _ in range(5):
#     print(grammar.generate("<entry>"))

# Define the function to generate test cases and save to a file
def generate_test_cases(grammar, n, start_symbol, file_name="test_cases.txt"):
    test_cases = []
    
    # Generate 'n' test cases
    for _ in range(n):
        try:
            test_case = grammar.generate(start_symbol)
            test_cases.append(test_case)
        except ExpansionError as e:
            print(f"Error generating test case: {e}")

    # Write test cases to a .txt file
    with open(file_name, "w") as file:
        for case in test_cases:
            file.write(case + "\n")
    
    print(f"Generated {len(test_cases)} test cases and saved to '{file_name}'.")

# Generate 100 test cases and save them in test_cases.txt
generate_test_cases(grammar, n=100, start_symbol="<entry>", file_name="test_cases.txt")
