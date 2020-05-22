#INCLUDE "PROTHEUS.CH"
#INCLUDE "FWMVCDEF.CH"

Function SERVER()
    Local   oBrowse as object

    oBrowse :=  FWmBrowse():New()

    oBrowse:SetDescription( "Cadastro de servidor para monitoramento" )
    oBrowse:SetAlias( 'ZZZ' )
    oBrowse:Activate()

Return

//-------------------------------------------------------------------------------------------------------------
/*/{Protheus.doc} MenuDef

/*/
//-------------------------------------------------------------------------------------------------------------
Static Function MenuDef()
    Local aRotina   as array

    aRotina	:= {}

    ADD OPTION aRotina TITLE 'Visualizar'	ACTION 'VIEWDEF.SERVER' OPERATION 2 ACCESS 0
    ADD OPTION aRotina TITLE 'Incluir'		ACTION 'VIEWDEF.SERVER' OPERATION 3 ACCESS 0
    ADD OPTION aRotina TITLE 'Alterar'		ACTION 'VIEWDEF.SERVER' OPERATION 4 ACCESS 0
    ADD OPTION aRotina TITLE 'Excluir'		ACTION 'VIEWDEF.SERVER' OPERATION 5 ACCESS 0

Return aRotina


//-------------------------------------------------------------------------------------------------------------
/*/{Protheus.doc} ModelDef

/*/
//-------------------------------------------------------------------------------------------------------------
Static Function ModelDef()

    Local oStruZZZ  as object
    Local oModel    as object

    oStruZZZ := FWFormStruct( 1, 'ZZZ' )
    oModel 	 := MPFormModel():New( 'SERVER')

    oModel:AddFields( 'MODEL_ZZZ' ,, oStruZZZ )

    oModel:GetModel( 'MODEL_ZZZ' ):SetPrimaryKey( { 'ZZZ_ID'} )

Return oModel

//-------------------------------------------------------------------------------------------------------------
/*/{Protheus.doc} ViewDef

/*/
//-------------------------------------------------------------------------------------------------------------
Static Function ViewDef()

    Local oModel    as object
    Local oStruZZZ  as object
    Local oView     as object

    oModel 	 := MPFormModel():new("SERVER")
    oStruZZZ := FWFormStruct( 2, 'ZZZ' )
    oView 	 := FWFormView():New()

    oView:SetModel( oModel )

    oView:AddField( 'VIEW_ZZZ', oStruZZZ, 'MODEL_ZZZ' )
    oView:EnableTitleView( 'VIEW_ZZZ', "Cadastro de servidor para monitoramento" )

    oView:CreateHorizontalBox( 'ZZZ', 100 )

    oModel:GetModel( 'MODEL_ZZZ' ):SetDescription("Cadastro de servidor para monitoramento")
    oView:SetOwnerView( 'VIEW_ZZZ', 'ZZZ' )

Return oView
