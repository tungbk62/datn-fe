import React, { useEffect, useState } from "react";
import { useStyles } from './style';
import {Img} from 'react-image';
import DeleteIcon from '@material-ui/icons/Delete';

const ImagePicker = (props : any) => {
    const { setDeleteImageId, images } = props;

    const classes = useStyles();
    const [imageId, setImageId] = useState([]) as any[];
    const [imageList, setImageList] = useState(images.map((o: any) => ({src : o.src, value : o.value, display : true})));

    const handleDeleteImage = (image: any) =>{
        imageId.push(image.value);
        setImageId(imageId);
        setDeleteImageId(imageId);

        let index = imageList.findIndex((o : any) => o.value === image.value);
        imageList[index].display = false;

        setImageList([...imageList]);

        console.log(imageId);
    }

    useEffect(() => {
        console.log("effect hihi");
        console.log(imageList);
    }, [imageList]);

    const renderImage = (image: { src: any, value: any, display : boolean }) => {
    return (
        <div>
            {image.display && (<div className={classes.imageContainer}>
            <Img className={classes.imageItem}
            src={image.src}
            />
            <DeleteIcon className={classes.imageIcon}
            onClick={() => handleDeleteImage(image)}/>
        </div>)}
        </div>
    )
    }

      return (
        <div className={classes.imageList}>
          { imageList.map(renderImage) }
        </div>
      );
  };

  export default ImagePicker;