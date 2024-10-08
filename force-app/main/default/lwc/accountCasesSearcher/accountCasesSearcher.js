//Import de la classe Lightning element et des décorateurs
import { LightningElement, track, api } from 'lwc';
//Import de la méthode findCaseBySubject de AccountCaseController
import findCasesBySubject from '@salesforce/apex/AccountCasesController.findCasesBySubject';

//Détail des colonnes de la lightning datatable
const COLUMNS = [
    { label: 'Subject', fieldName: 'Subject', type: 'text' },
    { label: 'Status', fieldName: 'Status', type: 'text' },
    { label: 'Priority', fieldName: 'Priority', type: 'text' },
];

export default class AccountCaseSearchComponent extends LightningElement {
    //récupère la propriété publique recordId (ID de la page active)
    @api recordId;
    //suit les propriétés de cases
    @track cases;
    //suit les propriétés de error
    @track error;
    //variable à laquelle sera affectée la valeur entrée par l'utilisateur
    searchTerm = '';
    //variable à laquelle sera affecté le message d'information en cas de recherche sans résultat
    noMatch;
    //variable columns utilisée dans le HTML
    columns = COLUMNS;

    //permet de mettre à jour la valeur de searchTerm au moment de la saisie par l'utilsateur dans la barre de recherche
    updateSearchTerm(event) {
        this.searchTerm = event.target.value;
    }

    //Gère ce qu'il se passe lorsque l'utilsateur clique sur le bouton Rechercher
    handleSearch() {
        //Appelle la fonction Apex findCasesBySubject
        findCasesBySubject({ accountId: this.recordId, subjectSearchTerm: this.searchTerm })
            .then(result => {
                //s'il y a au moins 1 résultat, les données sont affichées
                if(result.length > 0) {
                    this.cases = result;
                    this.noMatch = undefined;
                    this.error = undefined;
                //s'il n'ya a aucun résultat, une message d'info est affiché
                } else {
                    this.noMatch = 'There are no cases matching your search.'
                    this.cases = undefined;
                    this.error = undefined;
                }
            })
            //S'il y a une erreur, un message d'erreur est affiché
            .catch(error => {
                this.error = 'An error occurred while searching for cases.';
            });
    }
}