import {swap} from './swap'

export const getQuickSortAnimation  = (arr) => {
    const dummy = [...arr]
    const animations = []
    quickSortHelper(dummy,0,dummy.length-1,animations)
    return animations
}

const quickSortHelper = (a,left,right,animations) => {
    if(right<=left) return
    const partitionIndex = partition(a,left,right,animations)
    quickSortHelper(a,left,partitionIndex,animations)
    quickSortHelper(a,partitionIndex+1,right,animations)
}

const partition = (a,left,right,animations) => {
    let i = left
    let j = right+1
    const pivot = a[left]

    while(true){
        while(a[++i]<=pivot){
            if(i===right) break
            animations.push([[i],false])
        }
        while(a[--j]>=pivot){
            if(j===left) break
            animations.push([[j],false])
        }
        if (j<=i) break
        animations.push([[i,a[j]],true])
        animations.push([[j,a[i]],true])
        swap(a,i,j)
    }
    animations.push([[left,a[j]],true])
    animations.push([[j,a[left]],true])
    swap(a,left,j)
    return j
}

