pipeline {
    agent any

    tools {
        maven 'Maven'   // Make sure Maven is configured in Jenkins global tools
        jdk 'Java21'    // Java 21 configured under Global Tool Configuration
        nodejs 'NodeJS' // NodeJS configured in Jenkins global tools
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Mspawan/BookStore_FullStack_fork.git'
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

        stage('Run Backend') {
            steps {
                dir('BookStore_Backend') {
                    sh 'nohup mvn spring-boot:run &'
                }
            }
        }

        stage('Run Frontend') {
            steps {
                dir('BookStore_Frontend') {
                    sh 'nohup npm start &'
                }
            }
        }
    }
}
