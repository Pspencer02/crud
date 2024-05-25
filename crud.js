
// add needed classes such as region, add, delete and section
class Region {
    constructor(name) {
        this.name = name;
        this.sections = [];
    }

    addSection(name, area) {
        this.sections.push(new Sections(name, area));
    }

    deleteSection(sectionId) {
        this.sections = this.sections.filter(section => section._id !== sectionId);
    }
}

class Sections {
    constructor(name, area) {
        this.name = name;
        this.area = area;
    }
}


//create service class to get, create, update and delete regions 
class RegionService {
    static getUrl() {
        return https//6650c87320f4f4c442761a3b.mockapi.io/;
    }

    static getAllRegions() {
        return $.get(this.getUrl());
    }

    static getRegion(id) {
        return $.get(`${this.getUrl()}/${id}`);
    }

    static createRegion(region) {
        return $.post(this.getUrl(), region);
    }

    static updateRegion(region) {
        return $.ajax({
            url: `${this.getUrl()}/${region._id}`,
            dataType: 'json',
            data: JSON.stringify(region),
            contentType: 'application/json', 
            type: 'PUT'
        });
    }

    static deleteRegion(id) {
        return $.ajax({
            url: `${this.getUrl()}/${id}`,
            type: 'DELETE'
        });
    }
}
//insert DOM manger 
class DOMManager {
    static regions;

    static getAllRegions() {
        RegionService.getAllRegions()
            .then(regions => this.render(regions))
            .catch(error => console.error('Error fetching regions:', error));
    }

    static createRegion(name) {
        console.log(name); // Debugging
        RegionService.createRegion(new Region(name))
            .then(() => this.getAllRegions())
            .catch(error => console.error('Error creating region:', error));
    }

    static deleteRegion(id) {
        RegionService.deleteRegion(id)
            .then(() => this.getAllRegions())
            .catch(error => console.error('Error deleting region:', error));
    }

    static addSection(regionId) {
        // addSection implementation
    }

    static deleteSection(regionId, sectionId) {
        // deleteSection implementation
    }

    static render(regions) {
        // render implementation
    }
}

$(document).ready(() => {
    DOMManager.getAllRegions();
    $('#create-new-region').click(() => {
        const newRegionName = $('#new-region-name').val();
        console.log(newRegionName); // Debugging
        DOMManager.createRegion(newRegionName);
        $('#new-region-name').val('');
    });
});
