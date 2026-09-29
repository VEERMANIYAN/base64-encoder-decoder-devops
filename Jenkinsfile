pipeline {
    agent any

    environment {
        APP_NAME = 'base64-encoder-decoder'
        BUILD_ARTIFACT = 'base64-encoder-decoder-build.zip'
        DEPLOY_DIR = './deploy_target'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '=== Stage 1: Checking out source code from Git ==='
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '=== Stage 2: Installing project dependencies ==='
                bat 'npm install --production=false'
            }
        }

        stage('Lint / Validate') {
            steps {
                echo '=== Stage 3: Running code syntax validation and linting ==='
                bat 'npm run lint'
            }
        }

        stage('Run Tests') {
            steps {
                echo '=== Stage 4: Executing automated Unit Tests ==='
                bat 'npm test'
            }
        }

        stage('Build / Package') {
            steps {
                echo '=== Stage 5: Building dist bundle and packaging ZIP artifact ==='
                bat 'npm run package'
            }
        }

        stage('Archive Artifact') {
            steps {
                echo '=== Stage 6: Archiving deployable ZIP artifact in Jenkins ==='
                archiveArtifacts artifacts: "${env.BUILD_ARTIFACT}", fingerprint: true
            }
        }

        stage('Deploy') {
            steps {
                echo '=== Stage 7: Deploying compiled application to Target Environment ==='
                bat "powershell -Command \"if (-not (Test-Path '${env.DEPLOY_DIR}')) { New-Item -ItemType Directory -Path '${env.DEPLOY_DIR}' -Force }; Expand-Archive -Path '${env.BUILD_ARTIFACT}' -DestinationPath '${env.DEPLOY_DIR}' -Force\""
            }
        }

        stage('Smoke Test') {
            steps {
                echo '=== Stage 8: Executing Post-Deployment Smoke Verification ==='
                bat 'npm run smoke-test'
            }
        }
    }

    post {
        always {
            echo '=== CI/CD Pipeline Execution Completed ==='
        }
        success {
            echo 'SUCCESS: Pipeline executed successfully! Application is deployed and verified.'
        }
        failure {
            echo 'FAILURE: Pipeline execution failed. Please check build logs for diagnostic details.'
        }
    }
}
