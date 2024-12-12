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
                echo 'Clone done'
            }
        }
		stage('build') {
			steps {
                checkout scm
				sh 'cd backend && npm -f install'
                sh 'cd frontend && npm -f install'
                sh 'cd frontend && npm run build'
                echo 'Build Done==============================='
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
                    echo 'Starting to push'
                    def dockerfileDir = "./frontend"
                    dockerImage = docker.build(frontend + ":latest", "--file ${dockerfileDir}/Dockerfile ${dockerfileDir}")
                    docker.withRegistry('', 'DockerHub_ID') {
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
                    docker.withRegistry('', 'DockerHub_ID') {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying locally..'

                steps{
                    ansiblePlaybook becomeUser: null,
                    colorized: true,
                    credentialsId: 'localhost',
                    disableHostKeyChecking: true,
                    installation: 'Ansible',
                    inventory: './inventory',
                    playbook: './deploy.yml',
                    sudoUser: null
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