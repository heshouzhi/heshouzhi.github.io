function sortTable(){
  Sortable.create(foo, {
    group: {
      name: 'foo',
      put: ['foo', 'bar']
    },
    animation: 100
  });

  Sortable.create(bar, {
    group: {
      name: 'bar',
      put: ['foo', 'bar']
    },
    animation: 100
  });

}
