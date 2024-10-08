import { LightningElement, track, api } from 'lwc';
import findCasesBySubject from '@salesforce/apex/AccountCasesController.findCasesBySubject';

const COLUMNS = [
    { label: 'Subject', fieldName: 'Subject', type: 'text' },
    { label: 'Status', fieldName: 'Status', type: 'text' },
    { label: 'Priority', fieldName: 'Priority', type: 'text' },
];

export default class AccountCaseSearchComponent extends LightningElement {
    @api recordId;
    @track cases;
    @track error;
    searchTerm = '';
    noMatch;
    columns = COLUMNS;

    updateSearchTerm(event) {
        this.searchTerm = event.target.value;
    }

    handleSearch() {
        findCasesBySubject({ accountId: this.recordId, subjectSearchTerm: this.searchTerm })
            .then(result => {
                if(result.length > 0) {
                    this.cases = result;
                    this.noMatch = undefined;
                    this.error = undefined;
                } else {
                    this.noMatch = 'There are no cases matching your search.'
                    this.cases = undefined;
                    this.error = undefined;
                }
            })
            .catch(error => {
                this.error = 'An error occurred while searching for cases.';
            });
    }
}