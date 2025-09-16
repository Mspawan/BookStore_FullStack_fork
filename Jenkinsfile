pipeline {
    agent any

    tools {
        jdk "Java21"         // Uses your Jenkins JDK installation name
        maven "Maven"        // Uses your Jenkins Maven installation name
        nodejs "NodeJS"      // Uses your Jenkins NodeJS installation name
    }

    environment {
        JAVA_HOME = tool name: 'Java21', type: 'jdk'
        PATH = "${JAVA_HOME}/bin:${PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Mspawan/BookStore_FullStack_fork.git'
            }
        }

        stage('Build Backend') {
            dir('BookStore_Backend') {
                steps {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            dir('BookStore_Frontend') {
                steps {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Run Backend') {
            dir('BookStore_Backend/target') {
                steps {
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
