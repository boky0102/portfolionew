import { gsap } from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

type LineOffsetObj = {
    left: number,
    name: string
}

const lines = document.querySelectorAll(".svg-line");

let lineOffsetMap = [] as LineOffsetObj[];

lines.forEach((line) => {
    const rect = line.getBoundingClientRect();
    const name = line.className;
    lineOffsetMap = [...lineOffsetMap, {
        left: rect.left,
        name: name
    }]
})

const def = document.querySelector(".def");

function calculateStartingRelativePos(y: number, height: number){
    const windowY = window.innerHeight;
    const percent = Math.round(y / windowY * 100);
    console.log(percent);
    const gradPos = {
        y1: `${percent +20 - height}%`,
        y2: `${percent +20 + height}%`
    }
    console.log(gradPos);
    return gradPos;
}

function getRealtiveDuration(y: number, duration: number){
    const windowY = window.innerHeight;
    const percent = y / windowY;
    return Math.round(duration * percent * 10) / 10;
}

document.addEventListener("mousemove", (event) => {
    const x = event.x;
    const y = event.y;
    const radius = "100px";
    lines.forEach((line, index) => {
        const rect = line.getBoundingClientRect();
        let gradName = "grad" + (index + 1).toString();
        let grad = document.getElementById(gradName);
        if(Math.abs(x - rect.left) < 10){
            
            if(grad){
                const startingPos = calculateStartingRelativePos(y, 20);
                const relativeDuration = getRealtiveDuration(y, 3);
                grad.setAttribute("y1", startingPos.y1);
                grad.setAttribute("y2", startingPos.y2);
                gsap.to(grad, {
                    duration: relativeDuration,
                    attr: {y1: "0%", y2: "10%"},
                    onCompleteParams: ["attr"],
                    onComplete: () => {

                    }
                }); 
            }
            
        } else{
            if(grad){
                grad.setAttribute("y1", "0");
                grad.setAttribute("y2", "0");
            }
            
        }
    })
})




