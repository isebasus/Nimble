import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { merch: [], loading: true };
    }

    static renderForecastsTable(merch) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {merch.map(merch =>
                        <tr key={merch.name}>
                            <td>{merch.name}</td>
                            <td>{merch.caption}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        this.populateWeatherData('Los Angeles Apparel');

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.merch);

        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData(merchType) {
        const formData = new FormData();
        formData.append('name', merchType);

        const response = await fetch('/api/Merch', {
            method: 'POST',
            body: formData
        })

        const data = await response.json();
        this.setState({ merch: data, loading: false });
    }
}
