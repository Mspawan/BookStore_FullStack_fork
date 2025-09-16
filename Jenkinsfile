pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Mspawan/BookStore_FullStack_fork.git', branch: 'main'
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying app...'
                // Example: Copy build files to /var/www/html for frontend
                // Or run "npm start" for backend
            }
        }
    }
}
