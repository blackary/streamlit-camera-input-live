# streamlit-camera-input-live

Alternative version of st.camera_input which returns the webcam images live, without any button press needed

[![Open in Streamlit](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://camera.streamlitapp.com)

## Installation instructions

```sh
pip install streamlit-camera-input-live
```

## Usage instructions

```python
import streamlit as st

from camera_input_live import camera_input_live

image = camera_input_live()

st.image(value)
```
