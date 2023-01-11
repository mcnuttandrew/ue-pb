import script from '../feedback';

const content =
  /* html */
  `
<p id="language">English | Español</p>
    <h1>49th Ward Participatory Budgeting</h1>
    <h2>2022 / 2023 cycle</h2>
    <p>Voting has concluded for the 2022/2023 Participatory Budgeting cycle.</p>
    <p id="feedback-bubble">
        Explore the projects that received the most votes and the allocations proposed by the residents.
    </p>
    <p id="feedback-bubble-map">
        Here you can compare participation across Wards, relative to each
        Ward’s demographics for the 2022/2023 Participatory Bugeting.
    </p>
    <!-- <label for="wards">Select two wards:</label>
    <select name="wards" id="ward_number" size="1" multiple>
        <option value="Ward 29">Ward 29</option>
        <option value="Ward 35">Ward 35</option>
        <option value="Ward 36">Ward 36</option>
        <option value="Ward 49">Ward 49</option>
    </select> -->
    <fieldset id="checkbox">
        <legend>Select a ward to compare with:</legend>
    
        <div>
          <input class = "t" type="checkbox" id="ward29" name="ward" value="29">
          <label for="">Ward 29</label>
        </div>
    
        <div>
          <input class = "t" type="checkbox" id="ward35" name="ward" value="35">
          <label for="ward35">Ward 35</label>
        </div>

        <div>
            <input class = "t" type="checkbox" id="ward36" name="ward" value="36">
            <label for="ward36">Ward 36</label>
          </div>

          <div>
            <input class = "t" type="checkbox" id="ward49" name="ward" value="49" checked>
            <label for="ward49">Ward 49</label>
          </div>
    </fieldset>
    <div id="parent">
        <div id="map-container"></div>
        <div id="charts-container">
            <div id="ward1" class="ward-container"></div>
            <div id="ward2" class="ward-container"></div>
        </div>
    </div>
    <div id="map"></div>
`;

export default {content, script};
