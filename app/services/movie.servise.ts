import theMovieDb from 'themoviedb-javascript-library'

export default class MovieSErvise{
    getlisy=async()=>{
        await theMovieDb.authentication.generateToken(
          (a)=>{
            console.log(a)
          }, 
          (b)=>{
            console.log(b)
          }
        )
        await theMovieDb.movies.getPopular({}, 
          (a)=>{
            console.log(a)
          }, 
          (b)=>{
            console.log(b)
          }
        )
      }
}

