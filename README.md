# Moodcom

Moodcom is a complete software with APIs and two different interfaces for web and mobile client. It allows users to analyse videos from streaming platform like [YouTube](https://www.youtube.com/ "YouTube's website") and soon [Vimeo](https://vimeo.com/ "Vimeo's website") or [Dailymotion](https://www.dailymotion.com/ "Dailymotion's website").

Moodcom is mainly hosted in Google Cloud Platform and more specificaly in AppEngine services. Our tools is available now online [here](https://moodcom.ew.r.appspot.com/ "Moodcom's website").

## Installation 

First download our project using git as following or pressing the download button on the top right hand corner:
```git
git clone https://github.com/Moodcom-Coreteam/Moodcom.git
```

## Analysis part

The analysis part consist in achieve all inteligence work. It is based on [`python`](https://www.python.org/downloads/release/python-3612/ "Python 3.6.12 release page") web application, this project are using the `3.16.12` version. In fact, it goals are the following:
 - Recover streaming platform commentaries
 - Load and use our AI prediction system based on [TensorFlow Keras](https://www.tensorflow.org/api_docs/python/tf/keras/Model "TensorFlow Kerras model documentation") model
 - Return a complete video analysis

Techlonogies used details:

| TECHNOLOGY | VERSION | PIP LIBRARY |
| ------ | ------ | ------ |
| Flask | 1.1.2 | [Flask](https://pypi.org/project/Flask/ "Flask PIP page") |
| Google API (python client) | 1.12.8 | [google-api-python-client](https://pypi.org/project/google-api-python-client/ "Google API python client documentation") |
| Tensorflow | 2.3.1 | [tensorflow](https://pypi.org/project/tensorflow/ "Tensorflow PIP page") |

## Frontend part

The Moodcom project consist in two frontend application. The based one as an `Angular` web application and the second one as an `Ionic` mobile application (Android build).

It have severals objectives like:
- Build and launch analysis
- Display analysis results with charts
- Authenticate users

Furthermore, the frontend part have a lot of addons functionnalities right now like:
- Analysis history
- Own YouTube playlists analysis
- Own YouTube videos analysis
- Google authentication
- Light and dark mode

### Web application part

This web appplication was developed with `Angular` and it is the skeleton of our project. All components developed in this part will be able to reused later during the ***Mobile application part***  with `Ionic`.

Techlonogies used details:

| TECHNOLOGY | VERSION | NPM LIBRARY |
| ------ | ------ | ------ |
| Angular (CLI) | 10.1.7 | [@angular/cli](https://www.npmjs.com/package/@angular/cli "@Angular/cli NPM page") |
| Highcharts | 2.8.2 | [highcharts](https://www.npmjs.com/package/highcharts "Highcharts NPM page") |

For the frontend part (web application), go into the ```frontend```folder, open a command prompt and as the ```backend``` part execute the package installation as:

```sh
npm install
```

And then run it locally using the following command:
```sh
ng serve
```

### Mobile application part

Our mobile application was developed with `Ionic` and his `6.12.3` version. All the components are adapted from the `Angular` ***Web application part***.

Techlonogies used details:

| TECHNOLOGY | VERSION | NPM LIBRARY |
| ------ | ------ | ------ |
| Angular Material | 10.2.7 | [@angular/material](https://www.npmjs.com/package/@angular/material "@Angular/material NPM page") |

For the mobile part (Ionic application), go into the ```ionic```folder, open a command prompt and as the previous part execute the package installation as:

```sh
npm install
```

And then run it locally using the following command:
```sh
ionic serve
```

## Backend part

The backend part is the API part. It runs with [`NodeJS`](https://nodejs.org/ "NodeJS offcial website") and his `12.17.0`  version. We are also hosting a [`MongoDB`](https://www.mongodb.com/ "MongoDB's website") database in `4.2.11` version in an [OVH](https://www.ovh.com/ "OVH's website") virtual machine.
| TECHNOLOGY | VERSION | NPM LIBRARY |
| ------ | ------ | ------ |
| Express | 4.17.1 | [express](https://www.npmjs.com/package/express "express NPM page") |
| Mongoose | 5.11.8 | [mongoose](https://www.npmjs.com/package/mongoose "mongoose NPM page") |

To start locally the backend part, in the ```api``` folder execute inside a command prompt the following command:
```sh
npm install
```
And after installation:
```sh
npm run start
```

***Better focus for a better touch !***
