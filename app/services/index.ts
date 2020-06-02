import {MovieServise} from './movie.servise'
import {GoogleLoginServise} from './google.servise'

const movieServise:MovieServise=new MovieServise
const googleLoginServise:GoogleLoginServise=new GoogleLoginServise

export {
    movieServise,
    googleLoginServise
}