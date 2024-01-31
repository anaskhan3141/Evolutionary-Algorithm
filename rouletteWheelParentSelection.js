function rouletteWheelSelection(population) {
    // Calculate the total fitness of the population
    const totalFitness = population.reduce((sum, individual) => sum + individual.fitness, 0);

    // Generate a random number between 0 and the total fitness
    const randomValue = Math.random() * totalFitness;

    // Select a parent based on the random value
    let cumulativeFitness = 0;
    for (const individual of population) {
        cumulativeFitness += individual.fitness;
        if (cumulativeFitness >= randomValue) {
            return individual;
        }
    }

    // In case of rounding errors or extreme values, return the last individual
    return population[population.length - 1];
}
function selectParentsForCrossover(population, numParents) {
    const selectedParents = [];

    for (let i = 0; i < numParents; i++) {
        const selectedParent = rouletteWheelSelection(population);

        // Add the selected parent to the array
        selectedParents.push(selectedParent);

        // Remove the selected parent from the population
        population = population.filter(individual => individual !== selectedParent);
    }

    return selectedParents;
}

// Example usage:
const population = [
    { fitness: 12 },
    { fitness: 10 },
    { fitness: 8 },
    { fitness: 5 },
    { fitness: 50 },
    { fitness: 60 },
    { fitness: 100 },
    { fitness: 88 },
    { fitness: 91 },
    { fitness: 25 },
];

const selectedParent = selectParentsForCrossover(population,population.length/2);
console.log("Selected Parent:", selectedParent);
