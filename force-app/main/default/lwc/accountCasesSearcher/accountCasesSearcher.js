import { LightningElement, track, api } from 'lwc';
import findCasesBySubject from '@salesforce/apex/AccountCasesController.findCasesBySubject';

const COLUMNS = [
    { label: 'Sujet', fieldName: 'Subject', type: 'text' },
    { label: 'Statut', fieldName: 'Status', type: 'text' },
    { label: 'Priorité', fieldName: 'Priority', type: 'text' },
];

export default class AccountCaseSearchComponent extends LightningElement {
    @api recordId;
    @track cases;
    @track error;
    searchTerm = '';
    columns = COLUMNS;

    updateSearchTerm(event) {
        this.searchTerm = event.target.value;
    }

    handleSearch() {
        findCasesBySubject({ accountId: this.recordId, subjectSearchTerm: this.searchTerm })
            .then(result => {
                if(result.length > 0) {
                    this.cases = result;
                    this.error = undefined;
                } else {
                    this.cases = undefined;
                    this.error = "There are no cases matching your search"
                }
            })
            .catch(error => {
                this.error = 'Une erreur est survenue lors de la recherche des cases.';
            });
    }
}