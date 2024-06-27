import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

// Define the possible theme types
type ThemeType = 'light' | 'dark' | 'pink' | 'green' | 'purple' | 'black' | 'white' | 'blueOcean' | 'coralReef';

// Define the props for the CardTemplate component
interface CardProps {
  title: string; // Title of the card
  image: string; // Background image for the card
  action: (theme: ThemeType) => void; // Function to apply the theme
  theme: ThemeType; // Theme associated with this card
}

// CardTemplate component
const CardTemplate: React.FC<CardProps> = ({ title, image, action, theme }) => {
  // Handle the apply button click
  const handleApply = () => {
    action(theme); // Call the action function with the current theme
  };

  return (
    <Card
      sx={{
        maxWidth: 568,
        height: '200px', 
        display: 'flex',
        flexDirection: 'column', 
        background: `url(${image}) center / cover no-repeat`, 
        boxShadow: 5,
      }}
    >
      <CardContent sx={{ flexGrow: 1, color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={handleApply}
          sx={{
            '&:hover': {
              backgroundColor: 'lightblue',
              color: "black",
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
