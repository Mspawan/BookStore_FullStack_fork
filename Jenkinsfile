pipeline {
    agent any

    tools {
        maven 'maven3'     // 👈 must match the name you saved in Global Tool Configuration
        nodejs 'node24'    // 👈 must match the name you saved for NodeJS
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('BookStore_Backend') {
                    sh 'mvn clean install -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('BookStore_Frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Package') {
            steps {
                sh 'echo "Packaging application..."'
                // For example, copy frontend build files into backend if needed
                // sh 'cp -r BookStore_Frontend/dist/* BookStore_Backend/src/main/resources/static/'
            }
        }

        stage('Deploy') {
            steps {
                sh 'echo "Deploy stage - you can add Docker or server deployment here."'
            }
        }
    }

    post {
        success {
            echo '✅ Build and packaging successful!'
        }
        failure {
            echo '❌ Build failed. Check logs above.'
        }
    }
}
