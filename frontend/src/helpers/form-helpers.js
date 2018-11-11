export function handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
}

export function selectEmployees(target) {
   this.setState({
      selected: target
   });
}
