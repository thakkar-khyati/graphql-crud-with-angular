import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

const Get_Quotes = gql`
  {
    quotes {
      quotes {
        quote
        author
        _id
      }
    }
  }
`;

const create_quote = gql`
  mutation createQuote($quote: String!, $author: String!) {
    createQuote(quoteInput: { quote: $quote, author: $author }) {
      _id
      quote
      author
    }
  }
`;

const delete_quote = gql`
  mutation deleteQuote($id: ID!) {
    deleteQuote(id: $id) {
      _id
      quote
      author
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  quotes!: Observable<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.quotes = this.apollo
      .watchQuery({
        query: Get_Quotes,
      })
      .valueChanges.pipe(
        map((results: any) => {
          console.log(results.data.quotes.quotes);
          return results.data.quotes.quotes;
        })
      );
  }

  create(quote: string, author: string) {
    this.apollo
      .mutate({
        mutation: create_quote,
        refetchQueries: [{ query: Get_Quotes }],
        variables: {
          quote: quote,
          author: author,
        },
      })
      .subscribe(() => {
        console.log('created');
      });
  }

  delete(id: string) {
    this.apollo.mutate({
      mutation:delete_quote,
      refetchQueries:[{query:Get_Quotes}],
      variables:{
        id:id
      }
    }).subscribe(()=>{
      console.log("deleted")
    })
  }
}
