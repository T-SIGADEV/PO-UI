# Sobre

    Versão 1.0 da aplicação de monitoramento de appserver do sistema Protheus.
    O projeto surgiu no grupo T-SIGADEV com o intuito de compartilhar conhecimento do PO-UI.
    A primeira versão foi criada por:
    Frontend: José Mauro
    Backend: Alessandro e José Mauro.

# Pré-requisitos

    NodeJs instalado.
    Fonte PRW compilado em todos os RPO's.
    Possuir um serviço rest configurado.
    Tabela ZZZ criada ou a que você criar na sua base, caso já possua a ZZZ.

# Configurando o projeto localmente.

    Cadastre os servidores que você deseja monitorar na tabela ZZZ(ou tabela criada)
    IP: IP do servidor
    Porta: Porta que está sendo executado o TCP do appserver.
    Ambiente: Environment do appserver
    Lista users: Se lista os usuários conectados no appserver.
    Obs: Informação adicional que deseja.

    Baixe o projeto, faça um download ou um git clone.
    Navegue através do seu VSCODE, crie uma pasta onde deseja rodar o projeto.
    Execute o comando abaixo.
    git clone https://github.com/T-SIGADEV/PO-UI.git

    Ainda no raiz do projeto, rode o comando abaixo.
    npm install

# Testando

    Altere o arquivo abaixo, coloque o seu endereço REST.
    portinari\Monitor\src\app\services\servers.service.ts

    http://<SEUIP>:<SUAPORTA>/rest/api/monitor/v1/allservers

    Mais pra frente iremos melhorar isso, por enquanto, para não confundir, deixaremos mais fácil o entendimento.

    Se o seu REST estiver funcionando e o fonte compilado, é possível realizar um teste através do 
    PostMan ou insomnia (o que eu uso local). Realize um GET no seu REST, passando o endereço acima.

# Executando

    No raiz do projeto, rode o comando ng serve
    Esse comando pode receber diversos parâmetros, mas rode assim mesmo.
    Por padrão, a aplicação inicia-se na porta 4200.
    Abra seu navegador e acesse localhost:4200.
