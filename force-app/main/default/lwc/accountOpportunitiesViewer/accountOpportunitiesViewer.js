import { LightningElement, api, wire, track } from 'lwc';
import getOpportunities from '@salesforce/apex/AccountOpportunitiesController.getOpportunities';
import { refreshApex } from "@salesforce/apex";

export default class AccountOpportunitiesViewer extends LightningElement {
    @api recordId;
    @track opportunities;
    @track error; //= {};
    wiredOpportunitiesResult;
    columns = [
        { label: 'Opportunity Name', fieldName: 'Name', type: 'text' },
        { label: 'Amount', fieldName: 'Amount', type: 'currency' },
        { label: 'Close Date', fieldName: 'CloseDate', type: 'date' },
        { label: 'Stage', fieldName: 'StageName', type: 'text' }
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
                this.error = "No opportunities are associated with this account.";   
            }
        } else {
            this.error = "An error occurred while loading opportunities."
            this.opportunities = undefined;
        }
    }

    handleRefresh() {
        refreshApex(this.wiredOpportunitiesResult);
    }
}