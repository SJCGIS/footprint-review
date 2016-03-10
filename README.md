# San Juan County Building Footprint Review

A simple web application for comparing and voting for the best building
footprint from two sources in San Juan County, WA.

Source code available on [GitHub](http://github.com/sjcgis/footprint-review)

## Why are we doing this?

San Juan County GIS has two sources of building footprints.

1.  SJC Footprints (Map 1) is a layer that has historically been updated by GIS
    staff and interns. Due to reductions in staffing, we have not updated the layer
    in several years so new buildings, additions and demolitions may not be
    included.

2.  Pictometry Footprints (Map 2) contains features that were automatically
    generated by proprietary remote sensing algorithms from Pictometry International
    as a service to San Juan County. Since these were generated by algorithms we're
    hoping to get some human eyes to review.

Votes will be tallied for each footprint and the footprint with the higher
number of votes will be in the final data. The final data will be published
on the GIS Download page on the [San Juan County website](http://sanjuanco.com).

We will also publish the final results on [OpenStreetMap](http://openstreetmap.org).

## How to contribute

Two maps are shown with the same aerial imagery (2013) but with different building
footprints. Compare the footprints with the aerial photo and click the
appropriate map button to vote for that footprint. If the footprints are
identical, vote for Map 1.

If the building is too obscured in the aerial photo or otherwise difficult to
see, click on the Skip button to load another footprint.

If neither footprint is accurate or otherwise needs manual review, click the
Flag button. The GIS team will carefully review all flagged footprints.

## License

Copyright 2016 San Juan County GIS

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   <http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [LICENSE](https://raw.github.com/sjcgis/footprint-review/master/LICENSE) file.
