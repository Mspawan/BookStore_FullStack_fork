pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Mspawan/BookStore_FullStack_fork.git', branch: 'main'
            }
        }
        stage('Build') {
            steps {
                echo 'Building FullStack Project...'
                // Example for backend (Java/Node/others):
                // sh 'mvn clean install'   // if it’s a Java project
                // sh 'npm install && npm run build'   // if it’s a Node.js project
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // sh 'mvn test' OR sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Example: Copy build files to /var/www/html or run docker-compose
            }
        }
    }
}
