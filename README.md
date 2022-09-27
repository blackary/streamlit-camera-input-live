# streamlit-camera-input-live

Alternative version of st.camera_input which returns the webcam images live, without any button press needed

## Installation instructions 

```sh
pip install streamlit-camera-input-live
```

## Usage instructions

```python
import streamlit as st

from camera_input_live import camera_input_live

value = camera_input_live()

st.write(value)
