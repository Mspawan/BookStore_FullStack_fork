export class ReviewModel {

    id: number;
    personEmail: string;
    personFirstName: string;
    date: Date;
    rating: number;
    reviewDescription: string;

    constructor ( id: number, personEmail: string, personFirstName: string, date: Date, rating: number, reviewDescription: string) {

        this.id = id;
        this.personEmail = personEmail;
        this.personFirstName = personFirstName;
        this.date = date;
        this.rating = rating;
        this.reviewDescription = reviewDescription;
    }
    
}