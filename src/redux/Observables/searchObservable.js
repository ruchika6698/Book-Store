import { Observable,from,BehaviorSubject} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {SearchList}from './../../service/AdminServices'

export const SearchSubscriber = new BehaviorSubject(0)
const searchObj = SearchSubscriber.asObservable();

export async  function Searchbook(searchWord){
    // this.props.GetSearchBooks(eve.target.value);
    SearchSubscriber.next( 
        await SearchList(searchWord)
    ) 
}