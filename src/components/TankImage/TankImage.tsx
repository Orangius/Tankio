import React from "react";
import Image from "next/image";
import styles from "@components/TankImage/TankImage.module.css";
import { mapValue } from "@/lib/utils"; // import the function that maps from one range to another
interface MyComponentProps {
  width?: number; // width can be present or not
  level: number;
  animated: boolean;
}

interface divStyle {
  width: number | string; // definition of the div style type
}

export default function TankImage({
  width,
  level,
  animated,
}: MyComponentProps) {
  let style: divStyle;
  if (width) {
    // if a width prop is passed
    style = { width: width }; // then use that width for the image
  } else {
    style = { width: "100%" }; // else, let the width be 100% of the container
  }
  const top = mapValue(level, 0, 100, 45, 0); // this lets me add level from 0 to 100 tank levels

  return (
    <div className={`${styles.main} `} style={style}>
      <Image
        src={
          animated
            ? "/Tank-Animated/Animated_Base.gif"
            : "/Tank-Static/Tank_Static_Base.png"
        }
        width={1000}
        height={1000}
        alt="Tankio Logo"
        priority
        className={`${styles.base} w-full h-full`}
      ></Image>

      <div className={`${styles.level}  w-full h-full`}>
        <Image
          src={
            animated
              ? "/Tank-Animated/Animated_Water_Level.gif"
              : "/Tank-Static/Static_Water_Level.png"
          }
          alt="Tankio Logo"
          height={1000}
          width={1000}
          className={`${styles.movement}  w-full h-full`}
          style={{ top: `${top}%` }}
        ></Image>
      </div>
    </div>
  );
}
