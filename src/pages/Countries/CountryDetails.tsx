import styled from "@emotion/styled";
import {
  IconButtonProps,
  IconButton,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Box,
  useTheme,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getCountries,
  selectCountries,
  updateSavedCountry,
} from "../../features/countries/countriesSlice";
import { ENDPOINTS } from "../../services/resources";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
  MdOutlineMoreVert,
  MdLocationPin,
} from "react-icons/md";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Country } from "../../types/countryType";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
}));

const CountryDetails = () => {
  const { state: countryName } = useLocation();
  const navigation = useNavigate();

  const countries = useAppSelector(selectCountries);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  useEffect(() => {
    dispatch(getCountries(`${ENDPOINTS.name}/${countryName}`));
  }, [countryName, dispatch]);

  const country = countries && countries[0];

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  const handleSaved = (country: Country) => {
    dispatch(updateSavedCountry(country));
  };

  // TODO add more info to details AND consider edge cases AND structure better
  return (
    <Box sx={{ minHeight: "82vh" }} className='country-details'>
      <Card
        sx={{
          maxWidth: "45vw",
          m: "1rem auto",
          bgcolor:
            theme.palette.mode === "light" ? "primary.light" : "primary.main",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='country literal'>
              <CardMedia
                component='img'
                height='auto'
                image={country.coatOfArms.png}
                alt='country symbol'
              />
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MdOutlineMoreVert />
            </IconButton>
          }
          title={country.name.common}
          subheader={country.capital}
        />
        <CardMedia
          sx={{
            p: "1rem",
            width: "90%",
            m: "0 auto",
          }}
          component='img'
          image={country.flags.png}
          alt={country.flags.alt}
        />
        <CardContent>
          <Typography variant='body2' color='text.primary' fontSize='1rem'>
            This country belongs to {country.region}
            {country.subregion
              ? " and ".concat(country.subregion).concat(" sub-region")
              : "."}
            . Located at the {country.latlng[0].toFixed(2)}&deg;N and{" "}
            {country.latlng[1].toFixed(2)}&deg;W, this country has population of{" "}
            {country.population}.{` `}
            {country.independent &&
              country.name.common.concat(" is independent")}
            {country.unMember && " and has UN Membership."}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='go back' onClick={() => navigation(-1)}>
            <MdOutlineKeyboardArrowLeft />
          </IconButton>
          <IconButton aria-label='location pin'>
            <MdLocationPin />
          </IconButton>
          <IconButton
            aria-label='favourite'
            onClick={() => handleSaved(country)}
          >
            <FavoriteIcon
              className='icon'
              sx={{ color: country.isSaved ? "custom.main" : "primary.main" }}
            ></FavoriteIcon>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <MdOutlineKeyboardArrowDown />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Official name: {country.name.official}
            </Typography>
            <Typography paragraph>
              Capital {country.capital} is located at{" "}
              {country.capitalInfo.latlng &&
                country.capitalInfo.latlng[0].toFixed(2)}
              &deg;N and{" "}
              {country.capitalInfo.latlng &&
                country.capitalInfo.latlng[1].toFixed(2)}
              &deg;W.
            </Typography>
            <Typography paragraph>
              Total area of {country.name.common} is {country.area}. It has
              borders with {country.borders?.length} countries.
            </Typography>
            <Typography paragraph>Good to know:</Typography>
            <Typography>
              A week in {country.name.common} starts from{" "}
              {capitalize(country.startOfWeek)}.{` `}
              {country.demonyms?.eng.f &&
                capitalize(country.demonyms?.eng.f)}{" "}
              cars have {country.car.signs} sign and there is {country.car.side}
              -hand driving.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default CountryDetails;
