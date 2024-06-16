import React , {useState} from 'react';
import Container from '@mui/material/Container';
import { Button, Grid, Grow } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Cards from './CardTemplate';
import ExitButton from '../ExitButton';

interface TemplateProps {
  onClose: () => void;
}
const Templates: React.FC<TemplateProps> = ({ onClose }) => {
  const [open, setOpen] = useState(true);


  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 500); // Wait for the animation to complete
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <Grow in={open} timeout={500}>
      <Container
         sx={{
          
          position: 'fixed',
          bottom: '5vh',
          left:'22vw',
          right:'17vw',
          boxShadow: 5,
          width: '70vw', // 70% der Viewport-Breite
          height: '85vh', // Höhe des Modal-Containers
          backgroundColor: '#cfe8fc', // Hintergrundfarbe des Modal-Containers
          padding: '50px', // Innenabstand des Modal-Containers
          pl: '100px',
          pr: '100px',
          borderRadius: '5px', // Abrundung der Ecken des Modal-Containers
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '0px',
          },
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
        }}
      >
        <ExitButton handleClose={handleClose}/>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Cards
              title="TemplateTest"
              image='../../assets/Test.jpg'
              text="Dies ist ein Testtemplate um zu testen dass diese Funktion funktioniert"
              action={handleClose}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Cards
              title="TemplateTest"
              image="test.jps"
              text="Dies ist ein Testtemplaet um zu testen dass diese Funktion funktioniert"
              action={handleClose}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Cards
              title="TemplateTest"
              image="test.jps"
              text="Dies ist ein Testtemplaet um zu testen dass diese Funktion funktioniert"
              action={handleClose}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Cards
              title="TemplateTest"
              image="test.jps"
              text="Dies ist ein Testtemplaet um zu testen dass diese Funktion funktioniert"
              action={handleClose}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Cards
              title="TemplateTest"
              image="test.jps"
              text="Dies ist ein Testtemplaet um zu testen dass diese Funktion funktioniert"
              action={handleClose}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Cards
              title="TemplateTest"
              image="test.jps"
              text="Dies ist ein Testtemplaet um zu testen dass diese Funktion funktioniert"
              action={handleClose}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Cards
              title="TemplateTest"
              image="test.jps"
              text="Dies ist ein Testtemplaet um zu testen dass diese Funktion funktioniert"
              action={handleClose}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Cards
              title="TemplateTest"
              image="test.jps"
              text="Dies ist ein Testtemplaet um zu testen dass diese Funktion funktioniert"
              action={handleClose}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Cards
              title="TemplateTest"
              image="test.jps"
              text="Dies ist ein Testtemplaet um zu testen dass diese Funktion funktioniert"
              action={handleClose}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Cards
              title="TemplateTest"
              image="test.jps"
              text="Dies ist ein Testtemplaet um zu testen dass diese Funktion funktioniert"
              action={handleClose}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Cards
              title="TemplateTest"
              image="test.jps"
              text="Dies ist ein Testtemplaet um zu testen dass diese Funktion funktioniert"
              action={handleClose}
            />
          </Grid>
        </Grid>
      </Container>
      </Grow>
    </React.Fragment>
  );
};

export default Templates;
