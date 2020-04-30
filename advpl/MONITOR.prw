#INCLUDE "TOTVS.CH"
#INCLUDE "RESTFUL.CH"

//-------------------------------------------------------------------------------------------------------------
/*/{Protheus.doc} WSRESTFUL

/*/
//-------------------------------------------------------------------------------------------------------------
WSRESTFUL MONITOR DESCRIPTION "Monitor de Servidores" //FORMAT APPLICATION_JSON

    WSMETHOD GET ALLSERVERS       DESCRIPTION "Retorna todos os servidores cadastrados." ;
        WSSYNTAX "/api/monitor/v1/allservers";
        PATH "/api/monitor/v1/allservers"

    WSMETHOD POST CREATENEWSERVER   DESCRIPTION "Cadastra um novo servidor no monitoramento" ;
        WSSYNTAX "/api/monitor/v1/createnewserver";
        PATH "/api/monitor/v1/createnewserver"

END WSRESTFUL


//-------------------------------------------------------------------------------------------------------------
/*/{Protheus.doc} Metodo GET
Retorna todos os servidores cadastrados.

@author José Mauro Dourado Lopes
@since 18/04/2020
@version 1.0
/*/
//---------------------------------------------------------------------------------------------------------------
WSMETHOD GET ALLSERVERS WSREST MONITOR

Local cQuery    as character
Local nLogins   as numeric
Local nPos      as numeric
Local nX        as numeric
Local oServers  as object
Local oSrv      as object
Local aServers  as array
Local aLogins   as array
Local aTmp      as array

nPos      := 1
nLogins   := 1
aServers  := {}
aLogins   := {}
oSrv      := NIL
cQuery    := U_RETSERVERS()


(cQuery)->(dbGoTop())

while (cQuery)->(!Eof())
    Aadd(aServers,JsonObject():new())
    nPos := Len(aServers)

    aServers[nPos]['ip']            := Alltrim((cQuery)->IP)
    aServers[nPos]['port']          := Alltrim((cQuery)->PORT)
    aServers[nPos]['environment']   := Alltrim((cQuery)->ENVIRONMENT)
    aServers[nPos]['obs']           := Alltrim((cQuery)->OBS)
    aServers[nPos]['users']         := Alltrim((cQuery)->USERS)

    oSrv := RPCCONNECT( Alltrim((cQuery)->IP), VAL((cQuery)->PORT), Alltrim((cQuery)->ENVIRONMENT), '99', '01' )
    if valtype(oSrv) == "O"
        If Alltrim((cQuery)->USERS) == 'T'
            oSrv:CALLPROC("RPCSetType", 3)
            aTmp  := oSrv:CALLPROC("GetUserInfoArray")
            For nX:=1 To Len(aTmp)
                Aadd(aLogins,JsonObject():new())
                nLogins := Len(aLogins)

                aLogins[nLogins]['idThread']       :=  aTmp[nX][3]
                aLogins[nLogins]['login']          :=  aTmp[nX][1]
                aLogins[nLogins]['computerName']   :=  aTmp[nX][2]
                aLogins[nLogins]['connectionHour'] :=  aTmp[nX][7]
                aLogins[nLogins]['time']           :=  aTmp[nX][8]
                aLogins[nLogins]['function']       :=  aTmp[nX][5]
                aLogins[nLogins]['typeThread']     :=  iif(Len(aTmp[nX])>=15,aTmp[nX][15],".")
                aLogins[nLogins]['observation']    :=  aTmp[nX][11]
            Next nX
            aServers[nPos]['listOfUsers']     := aLogins
            aServers[nPos]['numberOfUsers']   := Len(aTmp)

        EndIf
        aTmp := nil
        aServers[nPos]['inactive']        := "false"
        aServers[nPos]['memory']          := oSrv:CallProc("U_RETMEMORY")
        aServers[nPos]['processor']       := oSrv:CallProc("U_RETPROC")
        oSrv:CALLPROC("RpcClearEnv")
        RPCDISCONNECT(oSrv)
    else
        aServers[nPos]['inactive']        := "true"
    endif
    (cQuery)->(DbSkip())
enddo


RpcClearEnv()
RpcSetType(3)
RpcSetEnv( '99', '01' )
If Empty(__cUSerID)
    cUserName  := 'Administrador'
    __cUSerID  := '000000'
Endif

oServers := JsonObject():New()
oServers['items'] := aServers

::SetContentType("application/json")
::SetStatus(200)
::SetResponse(oServers:toJSON())

Return .T.

User Function RETMEMORY()
    Local cInfo     as character
    Local aInfo     as array
    Local nMemory   as numeric

    cInfo := GETSRVMEMINFO()
    aInfo := StrTokArr( cInfo, "   " )
    nMemory := NOROUND((VAL(aInfo[7])/VAL(aInfo[4]))*100,2)
Return nMemory

User Function RETPROC()
    Local aInfoComp as array
    Local nProcessa as numeric

    aInfoComp := GetSrvInfo()
    nProcessa := aInfoComp[5]

Return nProcessa

/*/{Protheus.doc} RETSERVERS
    (long_description)
    @type  Function
    @author José Mauro Dourado Lopes
    @since 18/04/2020
    @version version
    @param 
    @return Retorna a query dos servidores cadastrados.
/*/
User Function RETSERVERS()

    Local cAlias    as character
    Local cSelect   as character
    Local cFrom     as character
    Local cWhere    as character
  

    cFrom  := RetSqlName( "ZZZ" ) + " ZZZ "
    cAlias := GetNextAlias()

    cSelect := " ZZZ.ZZZ_IP AS IP, ZZZ.ZZZ_PORTA AS PORT, "
    cSelect += " ZZZ.ZZZ_AMBIEN AS ENVIRONMENT, ZZZ.ZZZ_OBS AS OBS, "
    cSelect += " ZZZ.ZZZ_USERS AS USERS"

    cSelect	:= "%" + cSelect  + "%"
    cFrom  	:= "%" + cFrom    + "%"
    cWhere 	:= "%" + cWhere   + "%"

    BeginSql Alias cAlias
    	SELECT %Exp:cSelect% FROM %Exp:cFrom%
    EndSql

Return cAlias
