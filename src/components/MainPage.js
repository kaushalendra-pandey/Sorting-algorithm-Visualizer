import React,{useState,useEffect,useRef} from 'react'
import {getInsertionSortAnimations} from './helpers/insertionSort'
import {getBubbleSortAnimation} from './helpers/bubbleSort'
import {getQuickSortAnimation} from './helpers/quickSort'
import './style.css'


const MainPage = () => {

    //initialization:
    const [arr,setArray] = useState([])
    const [sorted,setSorted] = useState(false)
    const [sorting,setSorting] = useState(false)
    const containerRef = useRef(null)

    
    //function to generate random array:
    const randomArray = () => {
        if(sorting) return
        if(sorted) resetArrayColor()
        setSorted(false)
        const temp = []
        for(let i=0;i<=100;i++){
            temp.push(Math.floor(Math.random()*50))
        }
        setArray(temp)

    }

    //insertion Sort:
    const doInsertionSort = () => {
        const animations = getInsertionSortAnimations(arr)
        animateArrayUpdate(animations)
    }

    // bubble sort
    const doBubbleSort = () => {
        const animations = getBubbleSortAnimation(arr)
        animateArrayUpdate(animations)
    }


    //quick sort
    const doQuickSort = () =>{
        const animations = getQuickSortAnimation(arr)
        console.log(animations);
        animateArrayUpdate(animations)
    }

    // Animation functions:
    const animateArrayUpdate = (animations) => {
        if(sorting){
            return
        }
        setSorting(true)
        animations.forEach(([comparison,swapped],index) => {
            setTimeout(()=>{
                if(!swapped){
                    if(comparison.length === 2){
                        const [i,j] = comparison
                        animateArrayAccess(i)
                        animateArrayAccess(j)
                    }else {
                        const [i] = comparison
                        animateArrayAccess(i)
                    }
                } else{
                    setArray((prev)=>{
                        const [k,newVal] = comparison
                        const newArray = [...prev]
                        newArray[k] = newVal
                        return newArray
                    })   
                }
            },index*2)
        });
        setTimeout(()=>{
            animateSortedArray()
        },animations.length*2)

    }

    const animateArrayAccess = (idx) =>{
            const arrayBars = containerRef.current.children
            const arrayBarStyle = arrayBars[idx].style
            setTimeout(()=>{
                arrayBarStyle.backgroundColor = "black"
            },2)

            setTimeout(()=>{
                arrayBarStyle.backgroundColor = 'purple'
            },5)
    }

    const animateSortedArray = () => {
        const arrayBars = containerRef.current.children
        for(let i=0;i<arrayBars.length;i++){
            const arrayBarStyle = arrayBars[i].style
            setTimeout(()=>{
                arrayBarStyle.backgroundColor="red"
            },i*2)
        }

        setTimeout(()=>{
            setSorted(true)
            setSorting(false)

        },arrayBars.length*2)

    }


    const resetArrayColor = () => {
        const arrayBars = containerRef.current.children
        for(let i=0;i<arr.length;i++){
            const arrayBarStyle = arrayBars[i].style
            arrayBarStyle.backgroundColor = ''
        }

    }


    
    
    useEffect(()=>{
        randomArray()
    },[])

    return (
        <div>
            <div className="mt-4">
                <button className="btn btn-success ms-2" onClick={randomArray}> Create Array</button>
                <button className="btn btn-success ms-2" onClick={randomArray}> Merge Sorts</button>
                <button className="btn btn-success ms-2" onClick={doQuickSort}> Quick Sort</button>
                <button className="btn btn-success ms-2" onClick={doInsertionSort}> Insertion Sort</button>
                <button className="btn btn-success ms-2" onClick={doBubbleSort}>Bubble Sort</button>
            </div>
            <div className="d-flex align-center ms-4 mt-4" ref={containerRef}>
                {
                    arr.map((item,index)=>{
                        return <div className="num-bars ms-1 bg-success" style={{height:`${item*9}px`}} className="num" key={index}></div>
                    })
                }
            </div>


           
        </div>
    )
}

export default MainPage
