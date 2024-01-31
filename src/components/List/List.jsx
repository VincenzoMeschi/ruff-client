import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./list.scss";

export default function List(props) {
    const [isMoved, setIsMoved] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const [slideNumber, setSlideNumber] = useState(0);

    const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${375 + distance}px)`;
        }
        if (
            direction === "right" &&
            slideNumber < Math.max(props.list.content.length - 5, 0)
        ) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${
                -375 + distance
            }px)`;
        }
    };

    const handleMouseDown = (e) => {
        setIsMoved(true);
        setDragging(true);
        setStartX(e.pageX);
        setStartScrollLeft(listRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const deltaX = e.pageX - startX;
        listRef.current.scrollLeft = startScrollLeft - deltaX;
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div className="list">
            <span className="listTitle">{props.list.title}</span>
            <div
                className="wrapper"
                onMouseDown={handleMouseDown}
                onmousemove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                ref={listRef}
            >
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => handleClick("left")}
                    style={{ display: !isMoved && "none" }}
                />
                <div className="containerArrow" ref={listRef}>
                    {props.list.content.map((item, index) => (
                        <ListItem
                            key={`index-${item}`}
                            index={index}
                            listIndex={props.listIndex}
                            movieId={item}
                            movies={props.movies}
                        />
                    ))}
                </div>
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}

// export default function List(props) {
// 	const [isMoved, setIsMoved] = useState(false);
// 	const [slideNumber, setSlideNumber] = useState(0);

// 	const listRef = useRef();

// 	const handleClick = (direction) => {
// 	  setIsMoved(true);
// 	  let distance = listRef.current.getBoundingClientRect().x - 50;
// 	  if (direction === "left" && slideNumber > 0) {
// 		setSlideNumber(slideNumber - 1);
// 		listRef.current.style.transform = `translateX(${375 + distance}px)`;
// 	  }
// 	  if (
// 		direction === "right" &&
// 		slideNumber < Math.max(props.list.content.length - 5, 0)
// 	  ) {
// 		setSlideNumber(slideNumber + 1);
// 		listRef.current.style.transform = `translateX(${-375 + distance}px)`;
// 	  }
// 	};
// 	return (
// 	  <div className="list">
// 		<span className="listTitle">{props.list.title}</span>
// 		<div className="wrapper">
// 		  <ArrowBackIosOutlined
// 			className="sliderArrow left"
// 			onClick={() => handleClick("left")}
// 			style={{ display: !isMoved && "none" }}
// 		  />
// 		  <div className="containerArrow" ref={listRef}>
// 			{props.list.content.map((item, index) => (
// 			  <ListItem
// 				key={`index-${item}`}
// 				index={index}
// 				listIndex={props.listIndex}
// 				movieId={item}
// 				movies={props.movies}
// 			  />
// 			))}
// 		  </div>
// 		  <ArrowForwardIosOutlined
// 			className="sliderArrow right"
// 			onClick={() => handleClick("right")}
// 		  />
// 		</div>
// 	  </div>
// 	);
//   }
