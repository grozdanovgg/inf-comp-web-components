pipeline {
    environment {
        environment = ""
        version = ""
        repository = ""
        namespace = ""
        name = ""
        tag = ""
    }
    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: "3"))
    }
    agent {
        node {
            label 'jenkins-linux-agent || jenkins-linux-agent-2'
            customWorkspace "/home/ubuntu/workspace/InfWebComponents/${env.BRANCH_NAME}/"
        }
    }
    parameters {
        string(name: 'ENVIRONMENT_PARAM', defaultValue: '', description: 'On which environment do we want to deploy to?')
    }
    stages {
        stage('Preparations') {
          steps {
            echo 'Initialize parameters as environment variables due to https://issues.jenkins-ci.org/browse/JENKINS-41929'
            evaluate """${def script = ""; params.each { k, v -> script += "env.${k} = '''${v}'''\n" }; return script}"""
          }
        }
        stage('Transition Jira ticket') {
          when {
            expression { env.ENVIRONMENT_PARAM == '' }
          }
          steps {
            script {
              build job: 'DevOps/Move Jira Tickets', propagate: false, wait: false, parameters: [
                  [$class: 'StringParameterValue', name: 'JIRA_PROJECT_PARAM', value: 'COMPA'],
                  [$class: 'StringParameterValue', name: 'BRANCH_NAME_PARAM', value: env.BRANCH_NAME],
                  [$class: 'StringParameterValue', name: 'CHANGE_BRANCH_PARAM', value: env.CHANGE_TARGET? '' : env.CHANGE_TARGET],
                  [$class: 'StringParameterValue', name: 'GIT_REPO_URL_PARAM', value: "https://gitlab.pixelmatic.com/pixelmatic/infinite-fleet/web/inf-companion-web-components.git"],
                  [$class: 'StringParameterValue', name: 'BUILD_NUMBER_PARAM', value: env.BUILD_NUMBER]
              ]
            }
          }
        }
        stage('Unit Testing') {
            when {
                anyOf {
                    changeRequest target: 'main'
                    branch 'main'
                }
            }
            steps {
                script {
                    sh "npm cache clean --force && npm ci && npm run test"
                }
            }
        }
        stage('SonarQube Analysis') {
            when {
                anyOf {
                    changeRequest target: 'main'
                    branch 'main'
                }
            }
            steps {
                script {
                    def scannerHome = tool 'SonarScanner';
                    def prKey = env.CHANGE_ID? "-Dsonar.pullrequest.key=${CHANGE_ID}" : ""
                    def prBranch = env.CHANGE_BRANCH? "-Dsonar.pullrequest.branch=${CHANGE_BRANCH}" : ""
                    def prBase = env.CHANGE_TARGET? "-Dsonar.pullrequest.base=${CHANGE_TARGET}" : ""
                    withSonarQubeEnv() {
                      sh "${scannerHome}/bin/sonar-scanner ${prKey} ${prBranch} ${prBase}"
                    }
                }
            }
        }
         stage("Sync translations") {
            when {
                allOf {
                    not { changeRequest() }
                    anyOf {
                        branch pattern: "release\\/.+", comparator: "REGEXP"
                        branch 'main'
                    }
                }
            }
            steps {
              script {
                def responseES = httpRequest 'https://api.poeditor.com/webhooks/702901f145'
                println("Language status es: " + responseES.status)
                def responseRU = httpRequest 'https://api.poeditor.com/webhooks/e3c9254e95'
                println("Language status ru: "+responseRU.status)
                def responsePT = httpRequest 'https://api.poeditor.com/webhooks/61c26bc6be'
                println("Language status pt: " + responsePT.status)
                def responseKO = httpRequest 'https://api.poeditor.com/webhooks/cfb81d8208'
                println("Language status ko: " + responseKO.status)
                def responseJP = httpRequest 'https://api.poeditor.com/webhooks/eaf748f227'
                println("Language status jp: " + responseJP.status)
                def responseIT = httpRequest 'https://api.poeditor.com/webhooks/9669469448'
                println("Language status it: " + responseIT.status)
                def responseDE = httpRequest 'https://api.poeditor.com/webhooks/c16daa4270'
                println("Language status de: " + responseDE.status)
                def responseFR = httpRequest 'https://api.poeditor.com/webhooks/56edf1ae2f'
                println("Language status fr: " + responseFR.status)
                def responseEN = httpRequest 'https://api.poeditor.com/webhooks/15a4641faa'
                println("Language status en: " + responseEN.status)
                def responseZHTW = httpRequest 'https://api.poeditor.com/webhooks/20070c232f'
                println("Language status zh TW: " + responseZHTW.status)
                def responseZH = httpRequest 'https://api.poeditor.com/webhooks/e8adeab646'
                println("Language status zh: "+responseZH.status)
              }
            }
        }
        stage("Deploying") {
            when {
                allOf {
                    not { changeRequest() }
                    anyOf {
                        branch pattern: "release\\/.+", comparator: "REGEXP"
                        branch 'main'
                        expression { env.ENVIRONMENT_PARAM != '' }
                    }
                }
            }
            steps {
                script{
                    switch (env.ENVIRONMENT_PARAM) {
                        case '':
                            if (BRANCH_NAME == "main") environment = "dev"
                            else if (BRANCH_NAME.startsWith("release/")) environment = "stage"
                            break
                        case 'prod':
                        case 'stage':
                        case 'dev':
                            environment = env.ENVIRONMENT_PARAM
                            break
                        default :
                            throw new Exception("Environment not accepted. This should be dev, stage or prod but was ${env.ENVIRONMENT_PARAM} instead.")
                    }
                    echo "Deploying to ${environment}..."
                }
                build job: 'pixelmatic/infinite-fleet/companion/Deploy inf-companion-web-components', parameters: [
                    [$class: 'StringParameterValue', name: 'ENVIRONMENT_PARAM', value: environment],
                    [$class: 'StringParameterValue', name: 'BRANCH_NAME_PARAM', value: env.BRANCH_NAME],
                    [$class: 'StringParameterValue', name: 'BUILD_NUMBER_PARAM', value: env.BUILD_NUMBER]
                ]
            }
        }
    }
}
