from pathlib import Path

import setuptools

this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text()

setuptools.setup(
    name="streamlit-camera-input-live",
    version="0.2.0",
    author="Zachary Blackwood",
    author_email="zachary@streamlit.io",
    description="Alternative version of st.camera_input which returns the webcam images live, without any button press needed",
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=setuptools.find_packages(where="src"),
    package_dir={"": "src"},
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.7",
    install_requires=["streamlit>=1.2", "jinja2"],
    url="https://github.com/blackary/streamlit-camera-input-live",
)
