pipeline{
    agent any

    environment
    {
        frontend = "bhavil13/ems-spe_fp-frontend"
        backend = "bhavil13/ems-spe_fp-backend"
        registryCredential = credentials('DockerHub_ID')
        dockerImage = ""
    }

    stages{
        stage('Stage 1: Git Clone'){
            steps{
                git branch: 'kubernetes',
                url:'https://github.com/Bhavil-13/Employee_Management_System_SPEFinalProject.git'
            }
        }
		stage('build') {
			steps {
                checkout scm
				sh 'cd backend && npm -f install'
                sh 'cd frontend && npm -f install'
                sh 'cd frontend && npm run build'
			}
		}

        // stage('Test') {
        //     steps {
        //         echo 'Testing..'
        //         // Start the MongoDB database container using Docker Compose
        //         sh 'docker-compose up -d mongo'

        //         // Run the server and client tests
        //         // sh 'cd server && npm test'

        //         // Stop the MongoDB container
        //         sh 'docker-compose down'
        //         echo 'Done Testing'
        //     }
        // }

        stage('Build and Push Docker Image - frontend') {
            steps {
                script{
                    def dockerfileDir = "./frontend"
                    dockerImage = docker.build(frontend + ":latest", "--file ${dockerfileDir}/Dockerfile ${dockerfileDir}")
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Build and Push Docker Image - backend') {
            steps {
                script{
                    def dockerfileDir = "./backend"
                    dockerImage = docker.build(backend + ":latest", "--file ${dockerfileDir}/Dockerfile ${dockerfileDir}")
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying locally..'

                withPythonEnv('python3') {
                    sh 'pip3 install ansible'
                    sh 'ansible-playbook playbook.yml -i inventory'
                }

                echo 'Done Deploying'
            }
        }

        stage('Cleaning Up') {
            steps {
                sh "docker rmi $frontend:latest" 
                sh "docker rmi $backend:latest" 
            }
        }
	}
}