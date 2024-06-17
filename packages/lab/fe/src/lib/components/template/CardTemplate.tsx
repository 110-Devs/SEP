// CardTemplate.js
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
//Elemente die wichtig für die Kartenerstellung sind
interface CardProps {
  title: string;
  image: string;
  text: string;
  action: () => void;
}
//Funktion die Card Komponenten erstellt
const CardTemplate: React.FC<CardProps> = ({ title, image, text, action }) => {
  return (
    <Card
      sx={{
        maxWidth: 568,
        backgroundColor: 'rgba(0, 120, 200)',
        boxShadow: 5,
      }}
    >
      <CardMedia sx={{ height: 240 }} image='../../assets/Test.jpg' title="Template" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="white">
          {title}
        </Typography>
        <Typography variant="body2" color="white">
          {text}
        </Typography>
        <Divider sx={{ borderColor: 'white' }}/>
      </CardContent>

      <CardActions>
        
        <Button
          variant="contained"
          onClick={action}
          
          sx={{
            backgroundColor: 'rgba(0, 170, 200)', 
            ml:"10px",
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(113, 249, 115, 1)', 
              color: 'black',
            },
          }}
        >
          Apply
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardTemplate;
