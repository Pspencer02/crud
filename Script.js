$(document).ready(function() {
    const apiUrl = 'https://666de0b17a3738f7cacd879b.mockapi.io/regions';

    // Function to fetch and display all regions
    function fetchRegions() {
        $.get(apiUrl)
            .done(function(regions) {
                $('#regionList').empty();
                regions.forEach(function(region) {
                    let sectionsHtml = '';

                    if (Array.isArray(region.sections) && region.sections.length > 0) {
                        sectionsHtml = region.sections.map(section => `
                            <div class="section">
                                <p>Name: ${section.name}</p>
                                <p>Area: ${section.area}</p>
                            </div>
                        `).join('');
                    }

                    $('#regionList').append(`
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${region.name}</h5>
                                <button class="btn btn-info btn-sm edit-btn" data-id="${region.id}" data-toggle="modal" data-target="#editModal">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${region.id}">Delete</button>
                                <div class="sections mt-3">
                                    ${sectionsHtml}
                                </div>
                            </div>
                        </div>
                    `);
                });
            })
            .fail(function(error) {
                console.error('Error fetching regions:', error);
            });
    }

    // Function to handle delete region
    function deleteRegion(regionId) {
        $.ajax({
            url: `${apiUrl}/${regionId}`,
            type: 'DELETE'
        })
        .done(function() {
            fetchRegions(); // Refresh regions after deletion
        })
        .fail(function(error) {
            console.error('Error deleting region:', error);
        });
    }

    // Event listener for delete button click
    $('#regionList').on('click', '.delete-btn', function() {
        const regionId = $(this).data('id');
        deleteRegion(regionId);
    });

    // Event listener for edit button click
    $('#regionList').on('click', '.edit-btn', function() {
        const regionId = $(this).data('id');
        // Code to populate edit modal with region details
        $.get(`${apiUrl}/${regionId}`)
            .done(function(region) {
                $('#editRegionId').val(region.id);
                $('#editRegionName').val(region.name);
                $('#editSections').empty();
                region.sections.forEach(function(section) {
                    $('#editSections').append(`
                        <div class="form-group">
                            <label for="editSectionName${section.id}">Section Name</label>
                            <input type="text" class="form-control" id="editSectionName${section.id}" name="editSectionName${section.id}" value="${section.name}" required>
                            <label for="editSectionArea${section.id}">Section Area</label>
                            <input type="text" class="form-control" id="editSectionArea${section.id}" name="editSectionArea${section.id}" value="${section.area}" required>
                        </div>
                    `);
                });
                $('#editModal').modal('show');
            })
            .fail(function(error) {
                console.error('Error fetching region details:', error);
            });
    });

    // Function to handle submit of edit region form
    $('#editRegionForm').submit(function(event) {
        event.preventDefault();
        const id = $('#editRegionId').val();
        const name = $('#editRegionName').val();
        const sections = [];
        $('#editSections .form-group').each(function() {
            const sectionId = $(this).find('input[type="text"]').attr('id').replace(/[^\d]/g, '');
            const sectionName = $(this).find(`#editSectionName${sectionId}`).val();
            const sectionArea = $(this).find(`#editSectionArea${sectionId}`).val();
            sections.push({ id: sectionId, name: sectionName, area: sectionArea });
        });
        $.ajax({
            url: `${apiUrl}/${id}`,
            type: 'PUT',
            data: { name, sections }
        })
        .done(function() {
            fetchRegions(); // Refresh regions after update
            $('#editModal').modal('hide');
        })
        .fail(function(error) {
            console.error('Error updating region:', error);
        });
    });

    // Initial fetch of regions on document ready
    fetchRegions();
});

