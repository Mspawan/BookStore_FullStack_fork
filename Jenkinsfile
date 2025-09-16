pipeline {
    agent any

    tools {
        jdk "Java17"         // Change to the exact name in Jenkins Global Tool Config
        maven "Maven"        // Jenkins Maven installation name
        nodejs "NodeJS"      // Jenkins NodeJS installation name
    }

    environment {
        JAVA_HOME = tool name: 'Java17', type: 'jdk'
        PATH = "${JAVA_HOME}/bin:${PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Mspawan/BookStore_FullStack_fork.git'
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

        stage('Run Backend') {
            steps {
                dir('BookStore_Backend/target') {
                    sh 'nohup java -jar *.jar > app.log 2>&1 &'
                }
            }
        }
    }

    post {
        success {
            echo "✅ BookStore app build & deployment successful!"
        }
        failure {
            echo "❌ Build failed. Please check Jenkins logs."
        }
    }
}
