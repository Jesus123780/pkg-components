/* eslint-disable no-undef */
import {
  Circle,
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader
} from '@react-google-maps/api'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { PColor, SECBGColor } from '../../../assets/colors'
import {
  Google,
  IconArrowLeft,
  IconDelete, IconDost, IconGoogleFullColor,
  IconLocationMap2,
  IconSearch
} from '../../../assets/icons'
import {
  Column,
  Overline,
  RippleButton,
  Row
} from '../../atoms'
import { InputHooks } from '../../molecules/Inputs/InputHooks/InputHooks'
import { Form } from './Form'
import mapStyle from './mapStyles'
import {
  Address,
  AwesomeModal,
  BtnAddressContainer,
  Button,
  Container,
  ContainerMap,
  ContainerTask,
  ContentAlert,
  ContentButton,
  ListTask,
  MapHeader,
  OptionsFunction,
  Span,
  Text
} from './styled'

export const MapStore = ({
  showModal,
  dataLocation = {
    getUserLocations: []
  },
  dataGetOneCity = {
    getOneCities: {}
  },
  dataDepartment = {
    getOneDepartment: {}
  },
  getDepartments = () => { },
  filterKeyObject = () => { },
  getCities = () => { },
  getOneCities = () => { },
  updateUserLocations = () => { },
  getOneCountry = () => { },
  getOneDepartment = () => { },
  handleLogout = () => { },
  setAlertBox = () => { },
  setLocationString = () => { },
  setShowModal = () => { } ,
  latitude,
  longitude,
  departments = [],
  countries = [],
  road = [],
  cities = [],
  dataCountry = {
    getOneCountry: {
      cName: ''
    }
  },
  useFormTools = () => { return }
}) => {
  const [modal, setModal] = useState(0)
  const circleRef = useRef()
  const [showCircle, setShowCircle] = useState(false)
  const [show, setShow] = useState(false)
  const center = {
    lat: -3.745,
    lng: -38.523
  }
  const [{ lat, lng }, setMarkers] = useState(center)
  const mapContainerStyle = {
    height: '70vh',
    width: '100%',
    position: 'absolute'
  }
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const [{ newLat, newLng }, setNewMarkers] = useState(center)
  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])
  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  const onMapDrag = useCallback((e) => {
    setMarkers(() => {
      return {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    })
  }, [])
  const countryName = dataCountry?.getOneCountry?.cName || ''
  const departmentName = dataDepartment?.getOneDepartment?.dName || ''
  const cityName = dataGetOneCity?.getOneCities?.cName || ''
  const locationInfo = [countryName, departmentName, cityName].filter(Boolean).join(' ')

  const fetchData = useCallback(async () => {
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationInfo} ${latitude} ${longitude}&key=${process.env.REACT_APP_API_KEY_GOOGLE_MAPS}`
    fetch(API)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response?.results) {
          const geometry = response?.results[0]?.geometry
          const { location } = geometry || {}
          const { lat, lng } = location || {}
          setMarkers(() => {
            return {
              lat,
              lng
            }
          })
          setNewMarkers(() => {
            return {
              newLat: lat,
              newLng: lng
            }
          })
        }
      })
      .catch(() => {
        return {}
      })
  }, [])

  const {
    suggestions: { data },
    setValue,
    value
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'CO' }
    }
  })
  const hableSearchLocation = () => {
    setModal(2)
    fetchData()
  }

  useEffect(() => {
    if (circleRef?.current?.props) {
      const { lat: currentLatApi, lng: currentLngApi } = circleRef?.current?.props?.center || {}
      if (currentLatApi !== lat) {
        setShowCircle(true)
      }
      if (currentLngApi !== lng) {
        setShowCircle(true)
      }
    }
  }, [lat, lng, newLat, newLng])

  const handleSave = async () => {
    setModal(0)
    return updateUserLocations({
      variables: {
        input: {
          cId: values.countryId,
          ctId: values.ctId,
          dId: values.dId,
          uLatitud: lat,
          uLongitude: lng,
          uLocationKnow: dataForm.uLocationKnow,
          uPiso: 1
        }
      }
    })
      .then(() => { return setAlertBox({ message: 'ubicación guardada exitosamente' }) })
      .catch((e) => {
        if (e.message === 'No se ha iniciado sesión') {
          handleLogout()
          return setAlertBox({ message: 'No se ha iniciado sesión' })
        }
        return setAlertBox({ message: 'Error al guardar la ubicación' })
      })
  }
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  const handleChangeLocation = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }

  const handleChangeSearch = e => {
    handleChangeLocation(e)
    if (e.target.name === 'countryId') {
      getDepartments({ variables: { cId: e.target.value } })
      getOneCountry({ variables: { cId: e.target.value } })
    } else if (e.target.name === 'dId') {
      getCities({ variables: { dId: e.target.value } })
      getOneDepartment({ variables: { dId: e.target.value } })
    } else if (e.target.name === 'ctId') {
      getOneCities({ variables: { ctId: e.target.value } })
    }
  }

  const closeAllState = () => {
    setShowModal(!showModal)
    setModal(0)
    setValues({})
    setShow(false)
  }
  const [check, setCheck] = useState(false)
  const [selected, setSelected] = useState(false)
  const handleCheckChange = (e) => {
    const { checked } = e.target
    setCheck(!!checked)
  }

  const handleDeleteUserLocations = () => {
    return
  }

  const handleSelectLocation = (elem) => {
    const data = filterKeyObject(elem, ['__typename', 'DatMod', 'DatCre'])
    localStorage.setItem('location.data', JSON.stringify(data))
    const location = localStorage.getItem('location.data')
    setSelected(JSON.parse(location))
    setLocationString(data)
  }
  const handleMyLocation = async () => {
    localStorage.removeItem('location.data')
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude} ${longitude} &key=${process.env.REACT_APP_API_KEY_GOOGLE_MAPS}`
    fetch(API)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        const data = {
          uLocationKnow: response?.results[0].formatted_address
        }
        const location = JSON.stringify(data)
        localStorage.setItem('location.data', location)

      })
      .catch(() => {
        return {}
      })
  }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY_GOOGLE_MAPS
  })


  const handleSelect = async ({ description }) => {
    const results = await getGeocode({ address: description })
    const { lat, lng } = await getLatLng(results[0])
    setMarkers(() => {
      return {
        lat,
        lng
      }
    })
    setModal(1)
    setValue('')
    setDataValue({
      uLocationKnow: description || ''
    })
  }


  const showAddressLis = value?.length < 4

  if (!isLoaded) {
    return <div></div>
  }

  return (
    <div>
      <Overline
        bgColor='#00000066'
        onClick={closeAllState}
        show={showModal}
        zIndex='999'
      />
      <AwesomeModal
        onClick={(e) => {
          return e.stopPropagation()
        }}
        showModal={showModal}
      >
        {
          <Container modal={modal === 0}>
            <div className='content-location'>
              <div style={{ position: 'sticky', top: '-15px', backgroundColor: '#ffffff', zIndex: 999, padding: '10px' }}>
                <Text as='h2'>
                  ¿Donde quieres recibir tu pedido?
                </Text>
                <Row
                  alignItems='center'
                  backgroundColor={SECBGColor}
                  borderRadius='8px'
                  margin='auto'
                  padding='5px'
                  style={{ position: 'sticky' }}
                  width='95%'
                >
                  <Column padding='10px' width='min-content'>
                    <IconSearch color={PColor} size={20} />
                  </Column>
                  <InputHooks
                    name='uLocationKnow'
                    onChange={(e) => {
                      return setValue(e.target.value)
                    }}
                    placeholder='Ingresa tu dirección como la conoces'
                    required
                    style={{ padding: '10px', width: '95%', margin: 'auto' }}
                  />
                </Row>

              </div>
              {showAddressLis && (
                <ContainerTask
                  onClick={() => {
                    return handleMyLocation()
                  }}
                >
                  <IconGoogleFullColor color={PColor} size={30} />
                  &nbsp; &nbsp; Usar mi ubicación
                </ContainerTask>
              )}
              <BtnAddressContainer>
                <Google size={60} />
              </BtnAddressContainer>
              {data.length > 0 &&
                value.length >= 4 &&
                data.map((address) => {
                  return (
                    <BtnAddressContainer
                      key={address.place_id}
                      onClick={() => {
                        return handleSelect(address)
                      }}
                      style={{ marginBottom: '10px', backgroundColor: 'transparent' }}
                      type='button'
                    >
                      <IconLocationMap2 size={30} />
                      <Address>
                        <Text as='h4' className='main_text--location'>
                          {address?.structured_formatting?.main_text || null}
                        </Text>
                        <span>{address?.structured_formatting?.secondary_text}</span>
                      </Address>
                    </BtnAddressContainer>
                  )
                })}
              {showAddressLis && dataLocation?.getUserLocations?.length > 0
                ? dataLocation?.getUserLocations.map((index) => {
                  const { cName } = index.city
                  const { dName } = index.department
                  const { cName: countryName } = index.pais
                  return (
                    <ContainerTask
                      key={index.locationId}
                      onClick={() => {
                        return handleSelectLocation(index)
                      }}
                      selected={selected?.locationId === index.locationId}
                      show={show === index}
                    >
                      <OptionsFunction show={show === index}>
                        <Button
                          onClick={() => {
                            return handleDeleteUserLocations()
                          }}
                        >
                          <IconDelete color={PColor} size={30} />
                        </Button>
                      </OptionsFunction>
                      <ListTask show={show === index}>
                        <div>
                          <Text> {countryName}</Text>
                          <Text> {dName}</Text>
                          <Text> {cName}</Text>
                        </div>
                        <Text> {index.uLocationKnow}</Text>
                      </ListTask>
                      <div style={{ display: 'contents' }}>
                        <Button
                          onClick={() => {
                            return setShow(index === show ? false : index)
                          }}
                        >
                          <IconDost color={show === index ? PColor : '#CCC'} size={30} />
                        </Button>
                      </div>
                    </ContainerTask>
                  )
                })
                : null}

              <ContentButton>
                <RippleButton
                  margin='auto'
                  onClick={() => {
                    return setModal(1)
                  }}
                  widthButton='100%'
                >
                  {' '}
                  Registra nueva ubicación
                </RippleButton>
              </ContentButton>
            </div>
          </Container>
        }
        {modal === 1 &&
        <Form
          check={check}
          cities={cities}
          countries={countries}
          dataForm={dataForm}
          departments={departments}
          errorForm={errorForm}
          hableSearchLocation={hableSearchLocation}
          handleChange={handleChange}
          handleChangeSearch={handleChangeSearch}
          handleCheckChange={handleCheckChange}
          handleSave={handleSave}
          modal={modal}
          road={road}
          setModal={setModal}
          values={values}
        />
        }
        <ContainerMap modal={modal === 2}>
          <MapHeader>
            <button
              onClick={() => {
                return setModal(1)
              }}
              style={{ backgroundColor: 'transparent' }}
            >
              <IconArrowLeft color={PColor} size={20} />
            </button>
            <Span>
              {locationInfo}
            </Span>
            <div></div>
          </MapHeader>
          {showCircle &&
            <ContentAlert>
              Has seleccionado una ubicación lejos de la dirección que ingresaste.
            </ContentAlert>
          }
          {isLoaded && <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY_GOOGLE_MAPS}>
            <GoogleMap
              center={{
                lat: lat,
                lng: lng
              }}
              mapContainerStyle={mapContainerStyle}
              onLoad={onLoad}
              onUnmount={onUnmount}

              options={{
                fullscreenControl: false,
                mapTypeControl: false,
                rotateControl: false,
                scaleControl: false,
                streetViewControl: false,
                zoomControl: false,
                styles: mapStyle,
                disableDefaultUI: true,
                draggable: true,
                backgroundColor: '#fff',
                scrollwheel: true,
                disableDoubleClickZoom: true,
                mapTypeId: 'roadmap'
              }}
              zoom={15}
            >
              <Circle
                center={{
                  lat: newLat,
                  lng: newLng
                }}
                draggable={false}
                options={{ fillColor: showCircle ? '#EE80AE33' : 'transparent', strokeColor: showCircle ? '#EE80AE66' : 'transparent' }}
                radius={1000}
                ref={circleRef}
              />
              <Marker
                draggable={true}
                icon={{
                  url: './images/icon.png',
                  anchor: new google.maps.Point(17, 46),
                  scaledSize: new google.maps.Size(26, 42)
                }}
                onDragEnd={onMapDrag}
                position={{
                  lat,
                  lng
                }}
              ></Marker>
            </GoogleMap>
          </LoadScript>}
          {modal === 2 && (
            <ContentButton>
              <RippleButton onClick={handleSave} style={{ width: '40%' }}>
                Confirmar
              </RippleButton>
            </ContentButton>
          )}
        </ContainerMap>
      </AwesomeModal>
    </div>
  )
}

MapStore.propTypes = {
  cities: PropTypes.array,
  countries: PropTypes.array,
  dataCountry: PropTypes.shape({
    getOneCountry: PropTypes.shape({
      cName: PropTypes.string
    })
  }),
  dataDepartment: PropTypes.shape({
    getOneDepartment: PropTypes.shape({
      dName: PropTypes.string
    })
  }),
  dataGetOneCity: PropTypes.shape({
    getOneCities: PropTypes.shape({
      cName: PropTypes.string
    })
  }),
  dataLocation: PropTypes.shape({
    getUserLocations: PropTypes.shape({
      length: PropTypes.number,
      map: PropTypes.func
    })
  }),
  departments: PropTypes.array,
  filterKeyObject: PropTypes.func,
  getCities: PropTypes.func,
  getDepartments: PropTypes.func,
  getOneCities: PropTypes.func,
  getOneCountry: PropTypes.func,
  getOneDepartment: PropTypes.func,
  handleLogout: PropTypes.func,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  road: PropTypes.array,
  setAlertBox: PropTypes.func,
  setLocationString: PropTypes.func,
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  updateUserLocations: PropTypes.func,
  useFormTools: PropTypes.func
}

export const Map = React.memo(MapStore)

Map.propTypes = {
  setShowModal: PropTypes.func,
  hableSearchLocation: PropTypes.func,
  showModal: PropTypes.bool,
  modal: PropTypes.number
}
