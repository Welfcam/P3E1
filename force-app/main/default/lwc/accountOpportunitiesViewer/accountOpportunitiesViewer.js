import { LightningElement, api, wire, track } from 'lwc';
import getOpportunities from '@salesforce/apex/AccountOpportunitiesController.getOpportunities';
import { refreshApex } from "@salesforce/apex";

export default class AccountOpportunitiesViewer extends LightningElement {
    @api recordId;
    @track opportunities;
    @track error; //= {};
    wiredOpportunitiesResult;
    columns = [
        { label: 'Nom Opportunité', fieldName: 'Name', type: 'text' },
        { label: 'Montant', fieldName: 'Amount', type: 'currency' },
        { label: 'Date de Clôture', fieldName: 'CloseDate', type: 'date' },
        { label: 'Phase', fieldName: 'StageName', type: 'text' }
    ];

    @wire(getOpportunities, { accountId: '$recordId' }) 
    wiredOpportunities (result) {
        this.wiredOpportunitiesResult = result;
        if (result.data) {
            if(result.data.length>0) {
                this.opportunities = result.data;
                this.error = undefined;
            } else {
                this.opportunities = undefined;
                this.error = "Aucune opportunité n'est associée à ce compte";   
            }
        } else {
            this.error = "Une erreur s'est produite lors du chargement des opportunités."
            this.opportunities = undefined;
        }
    }

    handleRefresh() {
        refreshApex(this.wiredOpportunitiesResult);
    }
}