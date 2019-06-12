import {Author} from "../domain/Author";
import React from "react";

const url = process.env.REACT_APP_URL;

type AuthorState = {
    authors: Array<Author>
}

export default abstract class AuthorGenericComponent extends React.Component<any, AuthorState> {

    _isMounted = false;

    constructor(props: any) {
        super(props);
        this.state = {authors: new Array<Author>()};
        this.loadAuthors = this.loadAuthors.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;
        this.loadAuthors();
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    loadAuthors() {
        console.log('+loadAuthors:' + url);
        fetch(url + '/authors')
            .then(response => response.json())
            .then(result => {
                console.log(result);
                const authors = result._embedded.authors.map((a: any) => {
                    return new Author(a._links.self.href, a.firstName, a.lastName);
                });
                if (this._isMounted) {
                    this.setState({authors: authors});
                }
            }, error => {
                console.error(error)
            });
    };

}