import styled from '@emotion/styled';
import { IconButtonProps, IconButton, Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, Collapse } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getCountries, selectCountries } from '../../features/countries/countriesSlice';
import { ENDPOINTS } from '../../services/resources'; 
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft, MdOutlineMoreVert, MdLocationPin } from 'react-icons/md'
import { current } from '@reduxjs/toolkit';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  // transition: theme.transitions.create('transform', {
  //   duration: theme.transitions.duration.shortest,
  // }
}),
);


const CountryDetails = () => {
  const { state: countryName } = useLocation();
  const navigation = useNavigate();

  const countries = useAppSelector(selectCountries);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries(`${ENDPOINTS.name}/${countryName}`))
  }, [countryName, dispatch])

  const country = countries && countries[0];

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  // TODO add more info to details AND consider edge cases AND structure better
  return (
    <article className='country-details'>
      <Card sx={{ maxWidth: "30vw" }} className='country__card'>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="country literal">
              <CardMedia
                component="img"
                height="auto"
                image={country.coatOfArms.png}
                alt='country symbol'
              />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MdOutlineMoreVert />
            </IconButton>
          }
          title={country.name.common}
          subheader={country.capital}
        />
        <CardMedia
          component="img"
          height="auto"
          image={country.flags.png}
          alt={country.flags.alt}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This country belongs to {country.region}{country.subregion ? ' and '.concat(country.subregion).concat(' sub-region') : '.'}.
            Located at the {country.latlng[0]}&deg;N and {country.latlng[1]}&deg;W, this country has
            population of {country.population}.{` `}
            {country.independent && country.name.common.concat(' is independent')}
            {country.unMember && ' and has UN Membership.'}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="go back" onClick={() => navigation(-1)}>
            <MdOutlineKeyboardArrowLeft />
          </IconButton>
          <IconButton aria-label="location pin">
            <MdLocationPin />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <MdOutlineKeyboardArrowDown />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Official name: {country.name.official}
            </Typography>
            <Typography paragraph>
              Capital {country.capital} is located at {country.capitalInfo.latlng && country.capitalInfo.latlng[0]}&deg;N
              and {country.capitalInfo.latlng && country.capitalInfo.latlng[1]}&deg;W.
            </Typography>
            <Typography paragraph>
              Total area of {country.name.common} is {country.area}. It has borders with {country.borders?.length} countries.
            </Typography>
            <Typography paragraph>
              Good to know:
            </Typography>
            <Typography>
              A week in {country.name.common} starts from {capitalize(country.startOfWeek)}.{` `}
              {country.demonyms?.eng.f && capitalize(country.demonyms?.eng.f)} cars have {country.car.signs} sign and
              there is {country.car.side}-hand driving.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </article>
  )
}

export default CountryDetails;