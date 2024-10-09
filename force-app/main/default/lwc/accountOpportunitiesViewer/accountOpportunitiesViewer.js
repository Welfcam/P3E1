//Import de la classe LightningElement et des décorateurs
import { LightningElement, api, wire, track } from 'lwc';
//Import de la méthode Apex getOpportunities
import getOpportunities from '@salesforce/apex/AccountOpportunitiesController.getOpportunities';
//Import de la méthode refreshApex
import { refreshApex } from "@salesforce/apex";

export default class AccountOpportunitiesViewer extends LightningElement {
    //récupère la propriété publique recordId (ID de la page active)
    @api recordId;
    //suit les propriétés de opportunities
    @track opportunities;
    //suit les propriétés de error
    @track error; //= {};
    //création d'une variable wiredOppotunitiesResult pour récupérer les données de getOpportunities (data et error)
    wiredOpportunitiesResult;
    //création d'une variable pour afficher une message informatif lorsque getOpportunities ne renvoie aucun résultat
    emptyTable;
    //définit la structure des colonnes de la lightning datatable (champs, noms et type des données à afficher)
    columns = [
        { label: 'Opportunity Name', fieldName: 'Name', type: 'text' },
        { label: 'Amount', fieldName: 'Amount', type: 'currency' },
        { label: 'Close Date', fieldName: 'CloseDate', type: 'date' },
        { label: 'Stage', fieldName: 'StageName', type: 'text' }
    ];

    //permet de récupérer les opportunités issues de la méthode Apex getOpportunities dont l'accountId correspond à l'ID du compte actif
    @wire(getOpportunities, { accountId: '$recordId' })
    //la fonction wiredOpportunities récupère en paramètre les résultas de la fonction Apex getOpportunities
    wiredOpportunities (result) {
        //Affecte le résultat de la fonction Apex getOpporutinites à la viariable wiredOpportunitiesResult
        this.wiredOpportunitiesResult = result;
        //Si les données de result sont >0 (au moins une opportunité), les opportinités sont affichées
        if (result.data) {
            if(result.data.length>0) {
                this.opportunities = result.data;
                this.error = undefined;
                this.emptyTable = undefined;
        //S'il n'y a aucune opportunité affichée, le message d'info est affiché            
            } else {
                this.opportunities = undefined;
                this.error = undefined;
                this.emptyTable = "No opportunities are associated with this account.";   
            }
        //Si la fonction ne renvoie une erreur, un message d'erreur est affiché    
        } else {
            this.error = "An error occurred while loading opportunities."
            this.opportunities = undefined;
            this.emptyTable = undefined;
        }
    }
    //permet de mettre à jour les données issues de la fonction Apex getOpportunities
    handleRefresh() {
        refreshApex(this.wiredOpportunitiesResult);
    }
}