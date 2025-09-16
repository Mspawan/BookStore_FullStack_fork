pipeline {
    agent any

    tools {
        maven 'Maven3'     // You must configure Maven under Jenkins → Manage Jenkins → Global Tool Configuration
        jdk 'Java21'       // Configure Java 21 the same way
        nodejs 'Node16'    // Or Node18 (configure in Jenkins tools)
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Mspawan/BookStore_FullStack_fork.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('BookStore_Backend') {
                    sh 'mvn clean package -DskipTests'
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

        stage('Deploy with Docker') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }
}
