# Versão 2

    Esta versão possibilita criar e remover um novo servidor do monitoramento.

    Os itens 2 e 3 foram criados apenas para demonstrar a passagem de parâmetro pro backend.

    1 - Compile os arquivos da pasta ADVPL.
    2 - Verifique o arquivo \src\app\services\servers.service.ts
        Nele, troque o endereço do REST para apontar pro seu.
    3 - Nos arquivos abaixo troque "ZZZ" pelo nome da tabela que você criou em seu ambiente.
            portinari\Monitor\src\app\monitor\monitor.component.ts
            portinari\Monitor\src\app\server-details\server-details.component.ts
            portinari\Monitor\src\app\servers-management\servers-management.component.ts
    4 - Rodando via protheus.
        Dentro do seu projeto, execute o comando ng build --prod
        Será gerado em portinari\Monitor\dist uma pasta com o nome Monitor.
        Faça o zip dessa pasta utilizando. Apenas extensão ZIP.
        Renomei o arquivo, removendo a extenção ZIP para APP.
        Joguei no seu diretório e compile o arquivo em seu RPO.
        Crie um menu com uma user function com o nome Monitor.
        Verifique o parâmetro MV_GCTPURL, ele deve conter o endereço do seu HTTP.
        https://tdn.totvs.com/display/public/PROT/FwCallApp+-+Abrindo+aplicativos+Web+no+Protheus

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
    git clone https://github.com/jotamauro/monitorprotheus.git

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
