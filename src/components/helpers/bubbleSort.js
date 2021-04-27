import {swap} from './swap'

export const getBubbleSortAnimation = (a) => {
    const dummy = [...a]
    const animations = []
    for(let i = 0; i<a.length;i++){
        for(let j=0;j<a.length-i-1;j++){
            animations.push([[j,j+1],false])
            if(dummy[j+1]<dummy[j]){
                animations.push([[j,dummy[j+1]],true])
                animations.push([[j+1,dummy[j]],true])
                swap(dummy,j,j+1)
            }
        }
    }
    console.log(animations);
    return animations
}