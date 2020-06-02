import theMovieDb from 'themoviedb-javascript-library'
import { movie } from '../class/movie.class'
import { observable, computed } from 'mobx'
import { Strings } from "../i18n/i18n"

export const urlFormat = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
export class MovieServise{

  @observable movieLiset:movie[]

  private pageNumber=1;
  private api_key=""
  @observable favorites=[]
  

    fetchMovieList=(page,language)=>{
      theMovieDb.authentication.generateToken(
        (key)=>{
          this.api_key=key
          theMovieDb.movies.getPopular({page:page,language:language}, 
            (movieLiset)=>{
              const movieObject=JSON.parse(movieLiset)
              if (page==1){
              this.movieLiset=movieObject.results
              }
              else{
                this.movieLiset=this.movieLiset.concat(movieObject.results)
                
              }
              return true
            }, 
            (err)=>{
              return false
            }
          )
        }, 
        (err)=>{
          return false
        }
      )
    }
    getFirestPage(){
      const language=Strings.language
      this.fetchMovieList(1,language)
    }
    getNextPage(){
      this.pageNumber++
      const language=Strings.language
      this.fetchMovieList(this.pageNumber,language)
    }

    addRemoveFavorites(location){
      const index=this.favorites.indexOf(location)
      if (index>-1){
        this.favorites.splice(index, 1);
      }
      else{
        this.favorites.push(location)
      }
    }
    
}
